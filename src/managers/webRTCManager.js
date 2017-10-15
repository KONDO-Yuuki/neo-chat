import Peer from 'skyway-sdk'

export default class webRTCManager {
    constructor() {
        this.createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        this.peer = new Peer({key: 'e43e83d5-cee2-4737-8ae2-10172eb186d5', debug: 3});
    }

    /**
     * シグナリングリングサーバ接続
     * @param func シグナリングサーバ接続確立時のコールバック
     * @return ユーザのpeerID
     */
    connectSignal(func) {
        // シグナリングサーバへの接続が確立したときに、このopenイベントが呼ばれる
        this.peer.on('open', () => {
            func(this.peer.id)
        });
    }

    /**
     * 相手からのビデオ通話接続を確立する
     * @return ユーザのvideoタグのsrcになる映像ストリームオブジェクト
     */
    setMeet() {
        // 相手からビデオ通話がかかってきた場合、このcallイベントが呼ばれる
        // - 渡されるcallオブジェクトを操作することで、ビデオ映像を送受信できる
        return this.peer.on('call', (call) => {

            // 切断時に利用するため、コールオブジェクトを保存しておく
            this.connectedCall = call;

            // 自分の映像ストリームを相手に渡す
            // - getUserMediaで取得したストリームオブジェクトを指定する
            call.answer(this.localStream);

            // 相手のストリームが渡された場合、このstreamイベントが呼ばれる
            // - 渡されるstreamオブジェクトは相手の映像についてのストリームオブジェクト
            call.on('stream', (stream) => {

                // 映像ストリームオブジェクトをURLに変換する
                // - video要素に表示できる形にするため変換している
                return this.createObjectURL(stream);
            });
        });
    }

    /**
     *　カメラマイクのストリームを取得する
     * @param audioFlg オーディオストリームを取得するか
     * @param videoFlg ビデオストリームを取得するか
     * @returns ディアのvideoタグのsrcになる映像ストリームオブジェクト
     */
    getStream(videoFlg, func) {
        // カメラ／マイクのストリームを取得する
        return navigator.mediaDevices.getUserMedia({audio: true, video: videoFlg})
            .then((stream) => {
                // このストリームを通話がかかってき場合と、通話をかける場合に利用するため、保存しておく
                func(stream);
            })
            .catch(() => {
                console.log("Error!");
                return 'errorっすよ'
            });
    }

    /**
     * 映像streamをvideoタグに埋め込む用のurlに変換する
     * @param stream user or dear stream src
     * @return srcObject
     */
    createStreamSrc(stream) {
        return URL.createObjectURL(stream)
    }

    /**
     * ディアと接続する
     * @param dearId
     */
    connectStart(dearId, localStream, ) {
        const call = this.peer.call(dearId, this.localStream);
        console.log("connect start!")
        // 相手のストリームが渡された場合、このstreamイベントが呼ばれる
        // - 渡されるstreamオブジェクトは相手の映像についてのストリームオブジェクト
        call.on('stream', (stream) => {
            // 映像ストリームオブジェクトをURLに変換する
            // - video要素に表示できる形にするため変換している
            // video要素のsrcに設定することで、映像を表示する
             this.createObjectURL(stream);
        });
    };

    /**
     * 接続を終了する
     */
    connectEnd() {
        this.connectedCall.close();
    }

}