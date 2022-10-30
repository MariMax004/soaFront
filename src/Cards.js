import React, {Component} from 'react';

class Cards extends Component {
    render() {
        return (
         <main>
             {this.props.items.map(el=>(
                 <h1>{el.title}</h1>
             ))}
         </main>
        );
    }
}

export default Cards;
