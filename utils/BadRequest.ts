export default function BadRequestException(this: any, error: any) {
  this.status = 400;
  this.error = error;
}
