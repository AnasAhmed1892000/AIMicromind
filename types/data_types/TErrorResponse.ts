import { AxiosError } from "axios";

type TErrorResponse = AxiosError<{ message: string }>;

export default TErrorResponse;
