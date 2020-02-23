import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from "classnames";

import styles from './styles.css'

export default class Pagination extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    pageRangeDisplayed: PropTypes.number,
    prevPageText: PropTypes.string,
    firstPageText: PropTypes.string,
    nextPageText: PropTypes.string,
    lastPageText: PropTypes.string,
    innerClass: PropTypes.string,
    itemClass: PropTypes.string,
    linkClass: PropTypes.string,
    activeClass: PropTypes.string,
    disabledClass: PropTypes.string
  }

  static defaultProps = {
    pageRangeDisplayed: 3,
    prevPageText: "⟨",
    firstPageText: "«",
    nextPageText: "⟩",
    lastPageText: "»",
    innerClass: "pagination",
    itemClass: undefined,
    linkClass: undefined,
    activeClass: "active",
    disabledClass: "disabled",
  }

  constructor(props) {
    super(props);
    this.state = {
      renderPageNumbers: ''
    } 
  }

  componentDidMount() {
    this.buildPages();
  }

  prev(e) {
    var page = this.props.options.current > 1 ? this.props.options.current - 1 : 1;
    this.toPage(e, page);
  }

  next(e) {
      var page = this.props.options.current + 1;
      this.toPage(e, page);
  }

  toPage(e, page) {
      e.preventDefault();
      if (page !== this.props.options.current && !(page > this.props.options.last || page < 1)) {
        this.props.onClick(page);
        this.props.options.current = page;

        this.buildPages();
      }
  }

  buildPages() {
    const pageNumbers = [];
    let renderPageNumbers;

    const { pageRangeDisplayed, itemClass, linkClass, activeClass, disabledClass } = this.props;

    if (this.props.options.total > 0) {
        
        for (let i = 1; i <= Math.ceil(this.props.options.total / this.props.options.perPage); i++) {                
            pageNumbers.push(i);
        }

        renderPageNumbers = pageNumbers
            .filter(number => (number == 1 && number >= this.props.options.current - pageRangeDisplayed) || number == this.props.options.total || (number >= this.props.options.current - pageRangeDisplayed && number <= this.props.options.current + pageRangeDisplayed))
            .map(number => {                    
                let classes = cx(itemClass, {
                  [activeClass]: this.props.options.current === number,
                  [disabledClass]: false
                });
                return (
                    <li key={number} className={classes}>
                        <a className={linkClass} href="#" onClick={(e) => this.toPage(e, number)} aria-label={`Go to page number ${number}`}>{number}</a>
                    </li>
                );
        });
    }

    this.setState({renderPageNumbers: renderPageNumbers});
  }

  render() {
    let renderPageNumbers = this.state.renderPageNumbers;
    const { innerClass, itemClass, linkClass, disabledClass } = this.props;

    return (
      <nav className={styles.nav_pagination}>
        <ul className={innerClass}>
            <li className={cx(itemClass, {
                  [disabledClass]: this.props.options.current == 1
                })}
            >
                <a className={linkClass} href="#" onClick={(e) => this.toPage(e, 1)}>{this.props.firstPageText}</a>
            </li>
            
            <li className={cx(itemClass, {
                  [disabledClass]: this.props.options.current === 1
                })}
            >
                <a className={linkClass} href="#" onClick={(e) => this.prev(e)}>{this.props.prevPageText}</a>
            </li>

            {renderPageNumbers}
            
            <li className={cx(itemClass, {
                  [disabledClass]: this.props.options.current === this.props.options.last
                })}
            >
                <a className={linkClass} href="#" onClick={(e) => this.next(e)}>{this.props.nextPageText}</a>
            </li>

            <li className={cx(itemClass, {
                  [disabledClass]: this.props.options.last == this.props.options.current
                })}
            >
                <a className={linkClass} href="#" onClick={(e) => this.toPage(e, this.props.options.last)}>{this.props.lastPageText}</a>
            </li>
        </ul>
    </nav>
    )
  }
}
