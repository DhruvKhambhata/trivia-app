//@ts-ignore
import swal from "sweetalert";
export default function SweetAlert(props: any) {
  return swal({
    ...props,
    timer: props?.timer ? props?.timer : 4000000,
  });
}
