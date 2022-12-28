import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import checkImage from '../../services/checkImage';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();
  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }
    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  renderItems(arr) {
    const items = arr.map((item) => (
      <li
        className="char__item"
        tabIndex={0}
        key={item.id}
        onClick={() => this.props.onCharSelected(item.id)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            this.props.onCharSelected(item.id);
          }
        }}
      >
        <img
          src={item.thumbnail}
          alt={item.name}
          style={{ objectFit: checkImage(item.thumbnail) }}
        />
        <div className="char__name">{item.name}</div>
      </li>
    ));
    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, offset, newItemLoading, charEnded } =
      this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? 'none' : 'block' }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
