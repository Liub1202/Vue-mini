import { isObject } from "@vue/shared";

// 用来存储代理后的结果，避免重复代理
const reactiveMap = new WeakMap()

enum ReactiveFlags {
    IS_REACTIVE = "__v_isReactive"
}

// 拦截
const mutableHandlers: ProxyHandler<any> = {
    get(target, key, recevier){
        if(key === ReactiveFlags.IS_REACTIVE){
            return true
        }
    },
    set(target, key, value, recevier) {
        return true
    }
}

export function reactive(target: Object) {
    return createReactiveObject(target)
}

function createReactiveObject(target: Object) {
    // 判断类型
    if(!isObject(target)){
        return target
    }

    // 判断 target 有没有被代理过
    if(target[ReactiveFlags.IS_REACTIVE]){
        return target
    }

    // 判断有没有缓存 
    if(reactiveMap.has(target)) {
        return reactiveMap.get(target)
    }

    let proxy = new Proxy(target, mutableHandlers)
    reactiveMap.set(target, proxy)
    return proxy
}