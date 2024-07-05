import { JointContent } from "antd/es/message/interface";

export const MESSAGE_EVENT_NAME = 'jenson_message';


const dispatch = (type, content, duration, onClose) => {
    window.dispatchEvent(new CustomEvent(MESSAGE_EVENT_NAME, {
        detail: {
            params: {
                content,
                duration,
                onClose
            },
            type: type,
        }
    }))
}

export const message = {
    success(content , duration , onClose ) {
        dispatch(MESSAGE_TYPES.SUCCESS, content, duration, onClose)
    },
    error(content , duration , onClose ) {
        dispatch(MESSAGE_TYPES.ERROR, content, duration, onClose)
    },
    info(content , duration , onClose ) {
        dispatch(MESSAGE_TYPES.INFO, content, duration, onClose)
    },
    warning(content , duration , onClose ) {
        dispatch(MESSAGE_TYPES.WARNING, content, duration, onClose)
    },
    loading(content , duration , onClose ) {
        dispatch(MESSAGE_TYPES.LOADING, content, duration, onClose)
    }
}

// message.success('这是个成功的测试', 2, () => {
//   console.log ('能否能在结束后被执行')
// })
