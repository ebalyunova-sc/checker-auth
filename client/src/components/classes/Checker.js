import React from 'react';

export default class Checker extends React.Component {
    render() {
        return (
            <div className={
                [
                    'checker',
                    (this.props.color + 'Checker'), 
                    ((this.props.type === 'lady')
                        ? 'lady' 
                        : ''
                    )
                ].join(' ')
            }>
            </div>
        )
    }
}