import React from 'react';
import { History } from 'react-router';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

class TagForm extends React.Component {
  @autobind
  search(event) {
    event.preventDefault();
    const searchTag = this.refs.searchTag.value;
    this.history.pushState(null, `/${searchTag}`);
    this.refs.tagSearch.reset();
  }

  render() {
    return (
      <form ref="tagSearch" onSubmit={this.search}>
        <ul className="menu">
          <li><input type="search" placeholder="#Tag" ref="searchTag" /></li>
          <li><button type="submit" className="button">Play</button></li>
        </ul>
      </form>
    );
  }
}

reactMixin.onClass(TagForm, History);

export default TagForm;
