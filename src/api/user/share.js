
import api from "../request";

let shareCFun = {

};
shareCFun.document = (ShareDTO) => {
    return api.post("/share/document",ShareDTO);
};
shareCFun.folder = (ShareDTO) => {
    return api.post("/share/folder", ShareDTO);
};
shareCFun.documentLink = (ShareDTO, link) => {
    return api.get(`/share/document/${link}`, ShareDTO);
};
shareCFun.access = (userId, documentId) => {
    return api.post("/share/access", null, {
        params: {
            userId: userId,
            documentId: documentId
        }
    });
};
shareCFun.recent = (userId) => {
    return api.get(`/share/recent/${userId} `);
};


// 获取通知列表
shareCFun.getNotifications = () => {
    return api.get("/admin/getNotice");
};

// 创建通知
shareCFun.createNotification = (notificationData) => {
    return api.post("/admin/publishNotice", notificationData);
};

// 编辑通知
shareCFun.updateNotification = (notificationId, notificationData) => {
    return api.post("/admin/publishNotice", notificationData);
};

// 删除通知
shareCFun.deleteNotification = (notificationId) => {
    return api.delete(`/admin/deleteNotice/${notificationId}`);
};



export default shareCFun;
