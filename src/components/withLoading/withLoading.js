import { Component } from 'react'
import { Spin } from 'antd'

let style = null

export default loadings => ComposedComponent => class extends ComposedComponent {
  constructor (props) {
    super(props)
    // 参数是函数
    if(typeof loadings === 'function') {
      this.func = loadings
    }
    // 参数是数组
    else if(Array.isArray(loadings)) {
      this.func = props => {
        let isLoading = false
        for(let i = 0, len = loadings.length; i < len; ++i) {
          if(props[loadings[i]]) {
            return true
          }
        }
        return false
      }
    }
    else {
      throw Error('请传入函数或数组作为参数')
    }
    if(!style) {
      const doc = document
      style = doc.createElement('style')
      style.type = 'text/css'
      style.innerHTML = '.withLoading .ant-spin-blur {filter: none}'
      doc.getElementsByTagName('head')[0].appendChild(style)
    }

  }
  // componentWillUnmount(){
  //   if(style) {
  //     console.log(style)
  //     try {
  //       document.getElementsByTagName('head')[0].removeChild(style)
  //     } catch (error) {
  //       console.warn(error)
  //     }

  //   }
  // }

  render () {
    const isloading = this.func(this.props) || false
  
    return (
      <Spin spinning={isloading} wrapperClassName='withLoading'>
        {super.render()}
      </Spin>
    )
  }
}
