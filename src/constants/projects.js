import { TECHNOLOGIES } from './technologies'
export const PROJECTS = [
	{
		name: "Cianbox ERP",
		description: [
			"Participé en el desarrollo y mantenimiento de Cianbox ERP, un sistema enfocado en emprendedores y empresas para gestionar su negocio.",
			"Mis principales tareas fueron implementar mejoras solicitadas por los usuarios, realizar cambios en la generación de informes en PDF y Excel y desarrollar informes personalizados.",
		],
		technologies: [TECHNOLOGIES.JS, TECHNOLOGIES.PHP, TECHNOLOGIES.MySQL, TECHNOLOGIES.Git, TECHNOLOGIES.HTML],
		linkToCode: null,
		video: null,
		deployedSite: null,
		images: [
			"/cianbox.webp",
		],
	},
	{
		name: "Somos Crespo",
		description: [
			"Desarrollada para el concurso Desarrollo de App creado por la Municipalidad de Crespo; es una herramienta innovadora que facilita la interacción entre los crespenses y el gobierno local.",
			"Está diseñada para que cada vecino pueda enviar solicitudes o quejas de manera eficiente y sin complicaciones, consultar el estado de los reclamos, acceder a información útil sobre servicios municipales y estar al tanto de las acciones y proyectos que lleva a cabo la Municipalidad.",
		],
		technologies: [TECHNOLOGIES.React, TECHNOLOGIES.Tailwind, TECHNOLOGIES.Git],
		linkToCode: "https://github.com/nicolasrodriguez3/crespo-app",
		video: null,
		deployedSite: "#",
		images: [
			"/somos-crespo-1.webp",
			"/somos-crespo-2.webp",
			"/somos-crespo-3.webp",
			"/somos-crespo-4.webp",
		],
	},
	// {
	// 	name: "ViajesDev",
	// 	description: [
	// 		"Proyecto final del tercer tramo del curso Desarrollador Web FullStack de Epica Educativa, se trata de una plataforma donde los usuarios pueden compartir fotos y experiencias de viajes",
	// 		"Permite ver las publicaciones de otras personas, y registrarse para poder crear publicaciones o comentar la de los demas.",
	// 	],
	// 	technologies: [
	// 		TECHNOLOGIES.React,
	// 		TECHNOLOGIES.Node,
	// 		TECHNOLOGIES.Express,
	// 		TECHNOLOGIES.MongoDB,
	// 		TECHNOLOGIES.Tailwind,
	// 		TECHNOLOGIES.Git,
	// 	],
	// 	linkToCode: "https://github.com/nicolasrodriguez3/crespo-app",
	// 	video: null,
	// 	deployedSite: null,
	// 	images: ["/somos-crespo-2.webp"],
	// },
	{
		name: "La Nerd Shop",
		description: [
			"Landing page bajo la temática geek y nerd, con un diseño moderno, colorido y divertido, que refleja la personalidad de la marca. El objetivo fue construir un sitio en React que pueda, en el futuro, evolucionar como e-commerce.",
		],
		technologies: [
			TECHNOLOGIES.HTML,
			TECHNOLOGIES.React,
			TECHNOLOGIES.Git,
		],
		linkToCode: "https://github.com/nicolasrodriguez3/la-nerd-shop",
		video: null,
		deployedSite: "https://la-nerd-shop.vercel.app/",
		images: ["/la-nerd-1.webp","/la-nerd-2.webp","/la-nerd-3.webp","/la-nerd-4.webp"],
	},
]