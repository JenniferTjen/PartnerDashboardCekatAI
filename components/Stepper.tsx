import React from 'react';

export default function Stepper({ currentStep, steps, onClickStep }) {
    const stepColor = (index) => {
        if (index < currentStep) return 'bg-[#805DCA]';
        if (index === currentStep) return 'bg-[#2196F3]';
        return 'bg-gray-300';
    };

    const isFinalStep = (index) => index === steps.length;

    return (
        <div className="relative flex w-full items-center justify-between">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="b- z-10 flex w-full flex-col items-center">
                        <button
                            type="button"
                            onClick={() => {
                                onClickStep(step?.id);
                            }}
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${stepColor(step?.id)}`}
                        >
                            {step?.id === currentStep ? <div className="h-3 w-3 rounded-full bg-white" /> : null}
                        </button>
                        <span className="mt-2 text-center text-xs text-gray-600">{step?.label}</span>
                    </div>
                    {!isFinalStep(step?.id) && <div className="absolute top-3 h-1 w-full bg-gray-300"></div>}
                </React.Fragment>
            ))}
        </div>
    );
}
