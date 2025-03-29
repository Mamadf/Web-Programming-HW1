document.addEventListener('DOMContentLoaded', function() {
    window.daysUntilDate = function(month, day) {
        const today = new Date();
        const currentYear = today.getFullYear();
        const targetDate = new Date(currentYear, month - 1, day);
        
        if (targetDate < today) {
            targetDate.setFullYear(currentYear + 1);
        }
        
        const diffTime = targetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return  diffDays + " روز باقی مانده";
        //برای محاسبات و پیدا کردن توابع مناسب این بخش از هوش مصنوعی کمک گرفتم
    };

    window.calculateHypotenuse = function(a, b) {
        if (a <= 0 || b <= 0) return 'اعداد باید مثبت باشند';
        const hypotenuse = Math.sqrt(a*a + b*b);
        return hypotenuse.toFixed(2) ;
    };

    const formulaElements = document.querySelectorAll('formula');

    function updateFormulas() {
        formulaElements.forEach(formula => {
            const expression = formula.getAttribute('evaluator');
            try {
                let evaluator = expression;
                const variables = expression.match(/\b(?!daysUntilDate\b)(?!calculateHypotenuse\b)[a-zA-Z_][a-zA-Z0-9_]*\b/g) || [];
                variables.forEach(variable => {
                    const input = document.getElementById(variable);
                    if (input && input.value && !isNaN(input.value)) {
                        evaluator = evaluator.replace(new RegExp(`\\b${variable}\\b`, 'g'), input.value);
                    } else {
                        throw new Error('Invalid input');
                    }
                });

                const result = eval(evaluator);
                formula.textContent = result;
            } catch (e) {
                formula.textContent = 'ورودی نامعتبر';
            }
        });
    }

    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', updateFormulas);
    });

    updateFormulas();
});