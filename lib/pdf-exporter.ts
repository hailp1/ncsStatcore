import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Note: jspdf-autotable is usually auto-attached to jsPDF prototype.
// If type errors occur, might need: import autoTable from 'jspdf-autotable';

export interface PDFExportOptions {
    title: string;
    analysisType: string;
    results: any;
    columns?: string[];
    filename?: string;
}

/**
 * Export analysis results to PDF (Text & Table based)
 */
export async function exportToPDF(options: PDFExportOptions): Promise<void> {
    try {
        const {
            title,
            analysisType,
            results,
            columns = [],
            filename = `statviet_${analysisType}_${Date.now()}.pdf`
        } = options;

        // Validate input data
        if (!results) {
            throw new Error('Không có dữ liệu để xuất PDF');
        }

        const doc = new jsPDF();
        let yPos = 20;

        // Helper to check page break
        const checkPageBreak = (height: number = 10) => {
            if (yPos + height > 280) {
                doc.addPage();
                yPos = 20;
            }
        };

        // Header
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text(title, 14, yPos);
        yPos += 10;

        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Được tạo bởi ncsStat vào ${new Date().toLocaleString('vi-VN')}`, 14, yPos);
        yPos += 10;

        // Line separator
        doc.setDrawColor(200);
        doc.line(14, yPos, 196, yPos);
        yPos += 10;

        // Analysis Specific Content
        doc.setFontSize(12);
        doc.setTextColor(0);

        // Dynamic handling based on type
        if (analysisType === 'cronbach') {
            const alpha = results.alpha ?? results.rawAlpha ?? 0;
            doc.text(`Cronbach's Alpha: ${alpha.toFixed(3)}`, 14, yPos);
            yPos += 7;

            let evalText = alpha >= 0.9 ? 'Xuất sắc' : alpha >= 0.7 ? 'Chấp nhận được' : 'Kém';
            doc.text(`Đánh giá: ${evalText}`, 14, yPos);
            yPos += 10;

            // Item Stats Table
            if (results.itemTotalStats && Array.isArray(results.itemTotalStats) && results.itemTotalStats.length > 0) {
                checkPageBreak(50);
                doc.text('Thống kê Item-Total:', 14, yPos);
                yPos += 5;

                const headers = [['Biến', 'Scale Mean if Deleted', 'Corrected Item-Total Cor.', 'Alpha if Deleted']];
                const data = results.itemTotalStats.map((item: any, idx: number) => [
                    columns[idx] || item.itemName || `Item ${idx + 1}`,
                    (item.scaleMeanIfDeleted ?? 0).toFixed(3),
                    (item.correctedItemTotalCorrelation ?? 0).toFixed(3),
                    (item.alphaIfItemDeleted ?? 0).toFixed(3)
                ]);

                (doc as any).autoTable({
                    startY: yPos,
                    head: headers,
                    body: data,
                    theme: 'grid',
                    headStyles: { fillColor: [41, 128, 185] }
                });
                yPos = (doc as any).lastAutoTable.finalY + 15;
            }
        }
        else if (analysisType === 'regression') {
            const { modelFit, coefficients, equation } = results;

            doc.setFontSize(10);
            doc.text(`Phương trình: ${equation}`, 14, yPos, { maxWidth: 180 });
            yPos += 15; // Equation might be long

            checkPageBreak();
            doc.text(`R Square: ${modelFit.rSquared.toFixed(3)} | Adj R Square: ${modelFit.adjRSquared.toFixed(3)}`, 14, yPos);
            yPos += 7;
            doc.text(`F: ${modelFit.fStatistic.toFixed(2)} | Sig: ${modelFit.pValue < 0.001 ? '< .001' : modelFit.pValue.toFixed(3)}`, 14, yPos);
            yPos += 10;

            // Coefficients Table
            const headers = [['Biến', 'B', 'Std. Error', 't', 'Sig.', 'VIF']];
            const data = coefficients.map((c: any) => [
                c.term,
                c.estimate.toFixed(3),
                c.stdError.toFixed(3),
                c.tValue.toFixed(3),
                c.pValue < 0.001 ? '< .001' : c.pValue.toFixed(3),
                c.vif ? c.vif.toFixed(3) : '-'
            ]);

            (doc as any).autoTable({
                startY: yPos,
                head: headers,
                body: data,
                theme: 'striped',
                headStyles: { fillColor: [50, 50, 50] }
            });
            yPos = (doc as any).lastAutoTable.finalY + 15;
        }
        else if (analysisType === 'efa') {
            doc.text(`KMO: ${results.kmo.toFixed(3)}`, 14, yPos);
            yPos += 7;
            doc.text(`Bartlett Sig: ${results.bartlettP < 0.001 ? '< .001' : results.bartlettP.toFixed(3)}`, 14, yPos);
            yPos += 10;

            // Loadings Table
            if (results.loadings) {
                const headers = [['Biến', ...Array(results.loadings[0].length).fill(0).map((_, i) => `Factor ${i + 1}`)]];
                const data = results.loadings.map((row: number[], i: number) => {
                    return [`Var ${i + 1} (${columns[i] || ''})`, ...row.map(v => v.toFixed(3))];
                });

                (doc as any).autoTable({
                    startY: yPos,
                    head: headers,
                    body: data,
                    theme: 'grid'
                });
                yPos = (doc as any).lastAutoTable.finalY + 15;
            }
        }
        else if (analysisType === 'cfa' || analysisType === 'sem') {
            const { fitMeasures, estimates } = results;

            // Fit Measures
            if (fitMeasures) {
                checkPageBreak();
                doc.text('Chỉ số độ phù hợp mô hình (Model Fit):', 14, yPos);
                yPos += 5;

                const fitHeaders = [['Chỉ số', 'Giá trị']];
                const fitOrder = ['chisq', 'df', 'pvalue', 'cfi', 'tli', 'rmsea', 'srmr'];
                const fitLabels: any = { chisq: 'Chi-square', df: 'df', pvalue: 'P-value', cfi: 'CFI', tli: 'TLI', rmsea: 'RMSEA', srmr: 'SRMR' };

                const fitData = fitOrder.map(key => [fitLabels[key], fitMeasures[key]?.toFixed(3) || '-']);

                (doc as any).autoTable({
                    startY: yPos,
                    head: fitHeaders,
                    body: fitData,
                    theme: 'plain',
                    tableWidth: 80
                });
                yPos = (doc as any).lastAutoTable.finalY + 15;
            }

            // Estimates Table
            if (estimates) {
                checkPageBreak();
                doc.text('Ước lượng tham số (CFA/SEM Estimates):', 14, yPos);
                yPos += 5;

                const estHeaders = [['LHS', 'Op', 'RHS', 'Est', 'Std.Err', 'z', 'P(>|z|)', 'Std.All']];
                const estData = estimates.map((e: any) => [
                    e.lhs,
                    e.op,
                    e.rhs,
                    e.est.toFixed(3),
                    e.se.toFixed(3),
                    e.z.toFixed(3),
                    e.pvalue < 0.001 ? '< .001' : e.pvalue.toFixed(3),
                    e.std_all.toFixed(3)
                ]);

                (doc as any).autoTable({
                    startY: yPos,
                    head: estHeaders,
                    body: estData,
                    theme: 'grid',
                    headStyles: { fillColor: [100, 100, 100] },
                    styles: { fontSize: 8 }
                });
            }
        }
        // Generic fallback for others (T-test, ANOVA etc)
        else if (results && typeof results === 'object') {
            const keys = Object.keys(results).filter(k => typeof results[k] === 'number' || typeof results[k] === 'string');
            const data = keys.map(k => [k, String(results[k])]);

            (doc as any).autoTable({
                startY: yPos,
                head: [['Metric', 'Value']],
                body: data
            });
        }

        doc.save(filename);
    } catch (error) {
        console.error("PDF Export Error:", error);
        // Simple fallback
    }
}

// Deprecated html2canvas method (kept for compat if needed, but not used)
export async function exportWithCharts(elementId: string, filename: string): Promise<void> {
    // Redirect to text export if possible or throw generic error
    // For now, empty implementation or simple alert to avoid crash
    console.warn("Screenshot export is disabled due to compatibility issues. Please use Text Export.");
}
