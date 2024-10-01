import Swal from 'sweetalert2';

const showAlert = (icon, title, showConfirmButton = true, timer) => {
    return Swal.fire({
        icon,
        title,
        showConfirmButton,
        timer
    });
};

export default showAlert;