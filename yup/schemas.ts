import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isValidNoRequiredImageType } from "@/utils/validation";

export const SignInSchema = yup.object().shape({
	email: yup.string().required("El campo email es requerido"),
	password: yup.string().required("El campo contraseña es requerido"),
});
export const SignUpSchema = yup.object().shape({
	name: yup.string().required("El campo nombre es requerido"),
	lastName: yup.string().required("El campo apellido es requerido"),
	email: yup.string().email("Email con formato no valido").required("El campo email es requerido"),
	password: yup
		.string()
		.required("El campo contraseña es requerido")
		.min(6, "El campo contraseña requiere de 6 caracteres minimo"),
	confirmPassword: yup
		.string()
		.required("El campo confirmar contraseña es requerido")
		.oneOf([yup.ref("password")], "Las contraseñas no coinciden"),
});

export const NewPostSchema = yup.object().shape({
	post: yup.string().required("La descripcion de tu experiencia es requerida"),
	image: yup.mixed().test("is-valid-image", "Image uploaded is not valid", (value: any) => isValidNoRequiredImageType(value)),
});

export function getYupSchema(yupSchema: yup.ObjectSchema<any, yup.AnyObject, any, "">) {
	return { resolver: yupResolver(yupSchema) };
}
