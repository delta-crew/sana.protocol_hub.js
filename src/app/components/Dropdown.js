import React from 'react';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: props.selected,
      listVisible: false,
    }

    this.select = this.select.bind(this);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  select(item) {
    this.setState({
      selected: item,
    });
    this.props.onSelect(item);
  }

  show() {
    this.setState({
      listVisible: true
    });
    document.addEventListener("click", this.hide);
  }

  hide() {
    this.setState({
      listVisible: false
    });
    document.removeEventListener("click", this.hide);
  }

  render() {
    return <div className={"dropdown-container" + (this.state.listVisible ? " show" : "")}>
      <div className={"dropdown-display" + (this.state.listVisible ? " clicked": "")} onClick={this.show}>
        <span>{this.state.selected.name} <span className='caret'></span></span>
        <i className="fa fa-angle-down"></i>
      </div>
      <div className="dropdown-list">
        <div>
          {this.renderListItems()}
        </div>
      </div>
    </div>;
  }

  renderListItems() {
    let items = [];
    for (var i = 0; i < this.props.list.length; i++) {
      let item = this.props.list[i];
      items.push(<div key={i} onClick={this.select.bind(this, item)}>
        <span>{item.name}</span>
      </div>);
    }
    return items;
  }
}

export default Dropdown;
