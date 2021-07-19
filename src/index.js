import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" 
      onClick={props.onClick}>
        {props.value}
      </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      questions: [
        'Thằng Nguyễn Đỗ Trọng ...',
        'Thằng Nguyễn Thiên Phúc ...',
        'Thằng Trần Trọng Tín ...',
        'Địa điểm nhậu lý tưởng là ...',
        'Ai là người bị mất 700k vào sáng ngày 19/07 ?',
        'Ai là ân nhân cứu mạng thầy Bủ lúc sắp chết đuối ?',
        'Thầy Bủ thích gì nhất ?',
        'Sinh nhật của thầy Bủ là ngày mấy ?',
        'Chị ong nâu nâu bay đi đâu ?'
      ],
      choices: [
        ['khùng', 'điên', 'thấy ghét', 'khó ưa'],
        ['ngu', 'xàm', 'vô duyên', 'thấy ghét'],
        ['dô dăn quá', 'bạn nhậu thầy Bủ', 'mất dạy', 'khó ưa'],
        ['nhà trọ bạn Trọng', 'Bình Thuận', 'Vũng Tàu', 'đại học Mở'],
        ['Đặng Hoàng Bửu', 'Nguyễn Đỗ Trọng', 'Nguyễn Thiên Phúc', 'Trần Trọng Tín'],
        ['Nguyễn Thiên Phúc', 'Nguyễn Bình', 'Trần Trọng Tín', 'Nhân viên hồ bơi'],
        ['sân si', 'kiếm chuyện', 'nhậu', 'lập trình'],
        ['04/02/2000', '14/02/2000', '31/02/2000', '29/02/2000'],
        ['đi thỉnh kinh', 'đi tìm mật', 'đi đâu kệ mẹ bả', 'đi cầu']
      ],
      correct: [
        [0, 0, 1, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
      ],
      quizShow: null,
      choiceShow: null,
      correctShow: null,
      xIsNext: true,
      isShow: false,
      current: null
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(this.state.squares) || squares[i]) {
      return ;
    }
    
    if (this.state.isShow === false) {
      squares[i] = null;
    } else {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
    }
    this.setState({
      squares: squares,
      quizShow: this.state.questions[i],
      choiceShow: this.state.choices[i],
      correctShow: this.state.correct[i],
      xIsNext: !this.state.xIsNext,
      current: i
    });
  }

  renderSquare(i) {
    return (
      <Square 
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
      />
    );
  }

  checkAns(i, answer, idx, arrCorrect) {
    if (arrCorrect[idx] === 1) {
      alert('Đúng gòi! Chúc mừng nha.');
      this.setState({
        isShow: true,
      })
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'O' : 'X';
      this.setState({
        squares: squares,
        isShow: false,
        quizShow: null,
        choiceShow: null
      });
      
    } else {
      alert('Trả lời sai! Mất lượt.');
      this.setState({
        isShow: false,
      })
      const squares = this.state.squares.slice();
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        isShow: false,
        quizShow: null,
        choiceShow: null
      });
    }
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="quiz">
          {this.state.quizShow ? this.state.quizShow : ''}
        </div>
        <div className="choices">
          {this.state.choiceShow ? this.state.choiceShow.map((c, idx) => {
            return (
              <li><button onClick={() => this.checkAns(this.state.current, c, idx, this.state.correctShow)}>{c}</button></li>
            );
          }) : ''}
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
