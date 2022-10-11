export default function FormCard({ children, currentStep, prevFormStep }) {
    return (
        <div >
            {currentStep < 3 && (
                <>
                    {currentStep > 0 && (
                        <button
                            onClick={prevFormStep}
                            type="button"
                        >
                            back
                        </button>
                    )}

                </>
            )}
            {children}
        </div>
    );
}
