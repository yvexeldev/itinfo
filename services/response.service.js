class Response {
    constructor(status, data, error, notification = {}) {
        this.data = data;
        this.status = status;
        this.notification = notification;
        this.error = error || {};
        this.success = error ? false : true;
        if (error && typeof data === "object") {
            this.error.info = this.data;
        }
    }
    getError(cb) {
        cb({
            status: this.status,
            data: this.data,
            error: {
                stackMsg: this.error.message || "",
                systemName: "",
                friendlyMsg: this.error.friendlyMsg || "",
                action: "none",
                show: true,
            },
            success: this.success,
            notification: this.notification,
        });
    }
}

module.exports = Response;
