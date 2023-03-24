import { RouletteSpinnerOverlay } from "react-spinner-overlay";

interface IProps{
    loading: boolean,
    text?: string
}
export const LoadingOverlay = ({loading, text = 'Loading...'}: IProps) => {
    return <RouletteSpinnerOverlay
        loading={loading}
        message={<p style={{ marginTop: "12px" }}>{text}</p>}
    />
}