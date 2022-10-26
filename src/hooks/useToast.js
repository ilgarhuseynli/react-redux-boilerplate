import Swal from "sweetalert2";

export const useToast = (props) => {
    const mixinTop = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        ...props,
    });


    const error = (message = 'Error occurred !!', title = 'Error') => Swal.fire({
        title: title,
        icon: 'error',
        text: message,
    });


    const success = (message = 'Success operation', title = 'Success') => Swal.fire({
        title: title,
        icon: 'success',
        text: message,
    });

    return {
        mixinTop,
        error,
        success
    }
};
