const { SheetParser } = require('./parser/SheetParser');
const logger = require('./logger').create({ name: 'function-utilities' });

// eslint-disable-next-line
const requireModule = async (path) => require(path);

class FunctionRegistry {
	static of() {
		return new FunctionRegistry();
	}

	registerCoreFunctionsModule(mod) {
		requireModule(mod)
			.then(({ functions, FunctionFactory }) => {
				if (functions) SheetParser.context.registerFunctions(functions);
				if (FunctionFactory) SheetParser.context.registerFunctionFactory(FunctionFactory);
			})
			.catch((err) => logger.info(err.message));
	}

	registerFunctionModule(mod) {
		requireModule(mod)
			.then(({ functions }) => functions && SheetParser.context.registerFunctions(functions))
			.catch((err) => logger.info(err.message));
	}

	registerFunctionDefinitions(fnDefinitions) {
		SheetParser.context.registerFunctionDefinitions(fnDefinitions);
	}

	getFunctionDefinitions() {
		return SheetParser.context.getFunctionDefinitions();
	}
}
module.exports = FunctionRegistry.of();