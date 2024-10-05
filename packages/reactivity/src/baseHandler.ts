enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive"
}

// 拦截
const mutableHandlers: ProxyHandler<any> = {
    get(target, key, recevier){
        if(key === ReactiveFlags.IS_REACTIVE){
            return true
        }
        // 在触发 get 的时候，应该去进行 effect 和 响应式属性 的映射，即依赖收集
        return Reflect.get(target, key, recevier)
    },
    set(target, key, value, recevier) {
        // 在触发 set 的时候，应该去触发对应 effect，即依赖更新

        return Reflect.set(target, key, value, recevier)
    }
}

export {
    ReactiveFlags, mutableHandlers
}