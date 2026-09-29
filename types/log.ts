export interface Log {
    id: string;
    user_id: string;
    file_name: string;
    file_size: number;
    total_rows: number;
    processed_rows: number;
    success_rows: number;
    error_rows: number;
    error_message: string | null;
    started_at: string;
    finished_at: string | null;
    created_at: string;
}
