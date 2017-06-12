---
title: redux-form笔记
date: 2017-03-24 23:50:55
tags: [react]
category: [学习笔记]
---

## 前言

这是我在学习redux的文档记得笔记，没有教程意义。

<!--more-->

## 简单的例子

```js
//simpleform.jsx
class SimpleForm extends Component {
    render(){
        return(
            <form onSubmit={this.props.handleSubmit}>
                <Field component="input" name="m"/>
                <button type="submit">click</button>
            </form>
        )
    }
}
export default reduxForm({
    form:'simpleForm'
})(SimpleForm);

//index.jsx
import SimpleForm form 'simpleform.jsx';
import {reducer as reduxFormReducer} from 'redux-form';
import {combineReducers,createStore} from 'redux';
import {Provider} from 'react-redux';

var reducer=combineReducers({
    form:reduxFormReducer
});

var store = createStore(reducer);

class Index extends Component {
    render(){
        return(
            <Provider store={store}>
                <SimpleForm onSubmit={(value)=>{console.log(value)}}/>
            </Provider>
        )
    }
}
```

* 主要方法在reduxForm 里，其会注入很多方法，包括handleSubmit。

## renderField Factory

可以使用一个函数方便的生成`div+label+input`

```jsx
class renderField extends Component {
	render(){
		var {input, label, type, meta}=this.props;
		var {touched,error,warning}=meta;
		return (
			<div>
				<label>{label}</label>
				<div>
					<input {...input} type={type}/>
					{touched&&((error && <span>{ error }</span>) || (warning && <span>{ warning }</span>))}
				</div>
			</div>
		)
	}
}

<Field component={renderField} type="text" label="username"/>
```
这里可以看到 `input props` 会包含在`Field` 设置的`name` `value` 等`props`。
`meta`则是`reduxForm`注入的。

## 验证

* 验证规则默认是blur时候触发
* 可以写在`reduxForm()`方法中


```js
const validate=(value)=>{
    const errors={}
    if(value.xxx){
        errors.xxx="这里写上验证失败返回字段"
    }
    return errors;
}
reduxForm({
    form:'12ty',
    validate,
    warn   //warn与valiate相同
})
```

* 也可以直接写在“行内”

```jsx
const needEnglish=(value)=>{
    if(/[a-z]{1,}/.test(value)){
        return null;
    }else{
        return "need English";
    }
}
const required=(value)=>{
    return value?null:"Required";
}
<Field component="input" validate={[required,needEnglish]} warn={}/>
//warn同理
```

* 写在submit中，在onSubmit中判断

## 异步验证 

在 `reduxForm({})` 声明 `asyncValidate` 函数,以及声明`asyncBlurFields`为要在blur
时候触发异步验证的field

```jsx

const sleep=(ms)=>new Promise((reslove)=>{
	setTimeout(reslove,ms)
});

const asyncValidate=(value)=>{
	return sleep(1000).then(()=>{
		if(value.username=="qwerty"){
			throw {username:"can't ~~ qwerty"};
		}
	})
}

```

** 这里asyncValidate函数返回的必须是一个 `Promise`对象

## 初始化表单

`reduxForm` 会给 `form` 注入一个 `initialvalues` `props`，可以用`connect`对应到`redux`中的`state`
来实现初始化数据

```js
function mapStateToProps(state){
	var state=state.initialForm;
	return {
		initialValues:state
	}
}

function mapActionToProps(dispatch){
	return {
		load:function(data){
			dispatch(loadAction(data))
		}
	}
}

export default connect(mapStateToProps,mapActionToProps)(
	reduxForm({
		form:'initialForm',
		validate,
		warn
	})(syncValidForm)
)

```

上面代码中 loadAction是一个action

## Remote Submit 提交按钮独立出来

```jsx
import {submit} form 'redux-form';
//formname为reduxForm方法里传入的form名称
<button onClick={submit('formname')}>submit</button>
```

## props

* submitting
    * 是够正在提交阶段（submit验证）

## reduxForm

* asyncBlurFields
* asyncValidate
* destoryOnUnmount
* enableReinitialize
    * boolean 默认值的 false 当为true时候，每次initialValues props变化时候，form都会重新初始化，但是不能初始化 keepDirtyOnreinitialize设置的项
* forceUnregisterOnUnmount
    * 
* getFormState
    * 
* keppDirtyOnReinitialize
    * 与enabeReinitialize对应
* initialValues
    * 初始值，是个对象，可以用react-redux和store中state对应起来
* onSubmit
    * 当不存在handleSubmit时候替代用
* onSubmitFail
    * 当submission失败时候触发
* onSubmitSuccess
* propNamespace
* pure
    * 不懂
* shouldValidate
    * 控制是否进行同步验证,会传入一个参数，有以下属性
        * values nextProps props initialRender 
        * 需要返回true或者false控制是否进行验证
* shouldAsyncValidate
    * 控制是否进行一步验证，传入的参数不同
* touchOnBlur
    * boolean[true] 设置 fields touched 如果 没有blur事件
* touchOnChange
    * 同上 default为false
* persistentSubmitErrors
    * boolean[false] 当change事件不存在时候不会移除submit errors
* validate
* warn

## 实例API

是reduxForm指传入到组件中的props

### dirty:boolean
当前值不和初始值（initialValues）相同时候为true

### invalid:boolean
存在validation errors 即 true

### pristine
和dirty对应

### registeredFields:array
一个数组储存着所有field的name和type信息的

### reset:function
重置表单到 initialValues

### submit:promise

### valid:boolean

和 invalid对应

### values

当前所有的field values

### wrappedInstance:ReactElement
