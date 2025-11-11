import SvgIcon from '@mui/material/SvgIcon';

export default function ItmoTripIcon() {
    return (
        <SvgIcon sx={{ height: 21, width: 100, mr: 2 }}>
            <svg
                width={86}
                height={19}
                viewBox="0 0 86 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <text
                    x="0"
                    y="14"
                    fontFamily="Arial, sans-serif"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#4876EE"
                >
                    ITMO.
                </text>

                <text
                    x="38"
                    y="14"
                    fontFamily="Arial, sans-serif"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#00D3AB"
                >
                    TRIP
                </text>
            </svg>
        </SvgIcon>
    );
}