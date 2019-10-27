import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: true, error: false };
    }

    render() {
        const { loading, error } = this.state;
        console.log({ loading, error });
        return (
            <>
                <header>
                    <h2 style={{ textAlign: 'center' }}>Silicon Valley Episodes</h2>
                </header>
            </>
        );
    }
}

export default App;
