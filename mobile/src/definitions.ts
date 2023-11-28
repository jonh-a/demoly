export interface ToastData {
    type: 'success' | 'warning' | 'error'
    message: string
}

export interface SongData {
    _id: string;
    name: string;
    updatedAt?: string;
}