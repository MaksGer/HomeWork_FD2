window.onload = function(e) {

    const inputs = document.querySelectorAll('.check'),
        button = document.querySelector('.button');
    button.addEventListener('click', () => {
        let error = false;

        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                inputs[i].classList.add('err');
                error = true;
            }
        }


    });
    let jqInputs = $('.check');

    jqInputs.on('click', function () {
        this.classList.remove('err');
    });

    jqInputs.on('focus', function () {
        this.classList.add('focus');
    });

    jqInputs.on('blur', function (e) {
        this.classList.remove('focus');
    });
    jqInputs.validation();
};