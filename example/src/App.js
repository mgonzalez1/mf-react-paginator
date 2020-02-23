import React, { Component } from 'react'

import Pagination from 'mf-react-paginator'

export default class App extends Component {
  
  toPage(num) {
    console.log(num);
  }

  render () {
    const options = {
      perPage: 10,
      current: 1,
      prev: false,
      next: true,
      last: 10,
      total: 100,
    };

    return (
      <div>
        <Pagination 
          options={options} 
          onClick={this.toPage.bind(this)} 
          pageRangeDisplayed={3}
          prevPageText={'Anterior'}
          firstPageText={'Primera página'}
          nextPageText={'Siguiente'}
          lastPageText={'Última página'}
          innerClass={undefined}
          itemClass={undefined}
          linkClass={undefined}
          activeClass={'active'}
          disabledClass={'disabled'}
        />
      </div>
    )
  }
}
