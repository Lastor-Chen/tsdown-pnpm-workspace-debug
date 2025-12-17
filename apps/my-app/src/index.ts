import { init } from '@pkg/lib-a/preload'
import { ping } from './moduleA'

init()
console.log(ping())
