var React = require("react");

var FormComponent = React.createClass({
    render: function () {
        return <form action='javascript:void(0)' onSubmit={this.handleLocalFormSubmit}><input type='text' placeholder='add todo item' ref='itemToAdd'/></form>
    },
    handleLocalFormSubmit: function(){
        this.props.handleFormSubmit(this.refs.itemToAdd.getDOMNode().value);
        this.refs.itemToAdd.getDOMNode().value = '';
    }
});

module.exports.View = React.createClass({
    getInitialState: function () {
        return {
            params: ['one', 'two', 'three', 'go']
        }
    },
    render: function () {
        var self = this;
        var list = self.state.params.map(function (item) {
            return <li>{item}</li>
        });
        return <div>
            <ul>{list}</ul>
            <FormComponent handleFormSubmit={this.handleFormSubmit}/></div>
    },
    handleFormSubmit: function (val) {
        this.state.params.push(val);
        this.setState();
    }
});
