import React, { useState } from 'react'

// Определние интерфейсов

// Струтктуры параметра
interface Param {
	id: number
	name: string
	type?: 'string'
}

// Значение параметра
interface ParamValue {
	paramId: number
	value: string
}

// Расширенный интерфейс для цвета
interface Color extends Param {
	value: string
}

// Структура модели
interface Model {
	paramValues: ParamValue[]
	colors: Color[]
}

// Пропсы для компонента
interface Props {
	params: Param[]
	model: Model
}

// класс отвечающий за отображение и редактирвоание параметров
class ParamEditor extends React.Component<Props, Model> {
	constructor(props: Props) {
		super(props)
		this.state = {
			paramValues: props.model.paramValues,
			colors: props.model.colors,
		}
	}

	handleParamChange = (paramId: number, value: string) => {
		this.setState(prevState => ({
			paramValues: prevState.paramValues.map(prevValue =>
				prevValue.paramId === paramId ? { ...prevValue, value } : prevValue
			),
		}))
	}
	handleColorChange = (colorId: number, value: string) => {
		this.setState(prevState => ({
			colors: prevState.colors.map(prevColor =>
				prevColor.id === colorId ? { ...prevColor, value } : prevColor
			),
		}))
	}

	getModel = (): Model => {
		return this.state
	}

	render() {
		const { params } = this.props
		const { paramValues, colors } = this.state
		return (
			<div>
				{params.map(param => (
					<div key={param.id}>
						<label>{param.name}</label>
						<input
							type='text'
							value={
								paramValues.find(value => value.paramId === param.id)?.value ||
								''
							}
							onChange={e => this.handleParamChange(param.id, e.target.value)}
						/>
					</div>
				))}
				{colors.map(color => (
					<div key={color.id}>
						<label>{color.name}</label>
						<input
							type='color'
							value={color.value}
							onChange={e => this.handleColorChange(color.id, e.target.value)}
						/>
					</div>
				))}
			</div>
		)
	}
}

const App: React.FC = () => {
	// задаем изначальные параметры
	const params: Param[] = [
		{ id: 1, name: 'Неназначено', type: 'string' },
		{ id: 2, name: 'Длина', type: 'string' },
	]
	const initialModel: Model = {
		paramValues: [
			{ paramId: 1, value: 'повседневное' },
			{ paramId: 2, value: 'макси' },
		],
		colors: [{ id: 1, name: 'Цвет', value: '#fff' }],
	}

	const [model, setModel] = useState<Model>(initialModel) // стейт для хранения модели
	let paramEditorRef: ParamEditor | null = null // используем реф для доступа к методу getModel()

	// метод для получения текущей модели, так же обноволение состояния
	const handleGetModel = () => {
		if (paramEditorRef) {
			const currentModel = paramEditorRef.getModel()
			console.log('currentModel', currentModel)
			setModel(currentModel)
		}
	}

	return (
		<div>
			<ParamEditor
				ref={ref => (paramEditorRef = ref)}
				params={params}
				model={model}
			/>
			<button onClick={handleGetModel}>Get Model</button>
			<div>
				<h3>Current Model</h3>
				<pre>{JSON.stringify(model, null, 2)}</pre>
			</div>
		</div>
	)
}

export default App
