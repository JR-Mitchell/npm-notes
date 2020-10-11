//Import from external 'react' module
import React from 'react';

class Button extends React.Component<{},{paraText: string, timeout?: ReturnType<typeof setTimeout>}> {
    constructor(props) {
        super(props);
        this.state = {paraText:""}
    }

    componentWillUnmount() {
        let timeout = this.state.timeout;
        if (timeout !== undefined) {
            clearTimeout(timeout);
        }
    }

    render() {
        const paraText = this.state.paraText;

        return <div>
            <button onClick={()=>{this.textCountdown(3);}}>
                Click here!
            </button>
            <p>
                {paraText}
            </p>
        </div>
    }

    textCountdown(secs: number) {
        if (secs > 0) {
            this.setState({
                paraText: "Waiting for "+secs.toString()+" seconds...",
                timeout: setTimeout(()=>{this.textCountdown(secs-1)},1000)
            });
        } else {
            this.setState({
                paraText: "Successfully waited!",
                timeout: undefined
            });
        }
    }
}

export default Button;
