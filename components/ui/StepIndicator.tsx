import React from 'react';
import { Check } from 'lucide-react';

interface Step {
    id: string;
    label: string;
}

interface StepIndicatorProps {
    steps: Step[];
    currentStep: string;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    const currentIndex = steps.findIndex(s => s.id === currentStep);

    return (
        <div className="w-full py-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => {
                        const isCompleted = index < currentIndex;
                        const isCurrent = index === currentIndex;
                        const isUpcoming = index > currentIndex;

                        return (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${isCompleted
                                                ? 'bg-indigo-600 text-white'
                                                : isCurrent
                                                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                                                    : 'bg-slate-100 text-slate-400'
                                            }`}
                                    >
                                        {isCompleted ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            <span>{index + 1}</span>
                                        )}
                                    </div>
                                    <span
                                        className={`mt-2 text-xs font-medium ${isCurrent ? 'text-indigo-600' : 'text-slate-500'
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-0.5 mx-4 transition-all ${isCompleted ? 'bg-indigo-600' : 'bg-slate-200'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
