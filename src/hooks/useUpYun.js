import request from "../utils/request";
import {useStore} from "vuex";

export default function () {
    function uuid() {
        let s = [];
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        let uuid = s.join("");
        return uuid;
    }

    function upLoadUpImg(file, uri) {
        let formData = new FormData();
        //所有字段都append进去
        formData.append('uri', uri);
        formData.append('file', file);
        return request({
            url: 'user/upYun/uploadFile',
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
    }

    const store = useStore(); // 使用useStore方法

    async function uploadAvatarImg(file) {
        let email = store.state.user.email
        let uri = "/Travel/avatar_" + email + ".png";
        return upLoadUpImg(file, uri);
    }

    async function uploadArticleImg(file, article_id) {
        let uri = "/Travel/tactic/" + article_id + ".png";
        return upLoadUpImg(file, uri);
    }

    async function uploadArticleInnerImg(file) {
        let uri = "/Travel/tactic/" + uuid() + ".png";
        return upLoadUpImg(file, uri);
    }

    return {uploadAvatarImg, uploadArticleImg, uploadArticleInnerImg}
}

