

function alerta() {
    Swal.fire({
        imageUrl: './src/img/developer.gif',
        imageWidth: 150,
        imageHeight: 150,
        text: '⚠️Esta no es su version final',
        title: '🚧 Este sitio está en desarrollo ',
        confirmButtonText: 'Entrar',
        color: '#000',
        background: '#ffffffb3',
        backdrop: 'rgba(0,0,0,0.7)',
        showClass: {
            popup: 'animate__animated animate__backInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__bounceOut'
        },
        footer: 'Proximamente'


    });
}
alerta();