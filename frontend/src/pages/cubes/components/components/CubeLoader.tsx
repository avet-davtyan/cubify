import './CubeLoader.css';

const CubeLoader = () => {
	const loaderStyles: Array<string> = [
		'loader',
		'loader2',
		'loader3',
		'loader4',
		'loader5',
		'loader6',
		'loader7',
	];
	const randomStyle: string = loaderStyles[Math.floor(Math.random() * loaderStyles.length)];
	return <div className={randomStyle} />;
};

export default CubeLoader;
