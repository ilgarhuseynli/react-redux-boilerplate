import Swal from "sweetalert2";

export class AlertLib {

  static deleteCondition = async () =>{
    let res = await Swal.fire({
      position: "center",
      toast: false,
      timer: null,
      title: "DeleteAlertTitle",
      text: "DeleteAlertDescription",
      buttonsStyling: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-secondary",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    return res.isConfirmed
  }

  static condition = async (title,text = '') =>{

    let res = await Swal.fire({
      position: "center",
      toast: false,
      timer: null,
      title: title,
      text: text,
      buttonsStyling: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-secondary",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    return res.isConfirmed
  }

  static toast = async (props) =>{

    return await Swal.fire({
      toast: true,
      position: "top-right",
      showConfirmButton: false,
      timer: 2000,
      ...props,
    })
  }

}
