import React from 'react';

class MdsProcedureListToolbar extends React.Component {
  render() {
    return (
      <nav id='mdsprocedure-list-toolbar'>
          <form className=''>
              <div className='form-group'>
                  <input type='text' className='form-control' placeholder='Filter by name' id='procedure-filter' />
              </div>
          </form>
          <div className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true' aria-expanded='false'>
                  Options <span className='caret'></span>
              </a>
              <ul className='dropdown-menu'>
                  <li><a id='sort-by-title' data-sort-key='title'>Sort by Title</a></li>
                  <li><a id='sort-by-author' data-sort-key='author'>Sort by Author</a></li>
                  <li><a id='sort-by-last-modified' data-sort-key='last_modified'>Sort by Last Modified</a></li>
                  <li role='separator' className='divider'></li>
                  <li><a id='asc-order' data-sort-order='asc'>Ascending Order</a></li>
                  <li><a id='desc-order' data-sort-order='desc'>Descending Order</a></li>
              </ul>
          </div>
      </nav>
    );
  }
}

module.exports = MdsProcedureListToolbar;
