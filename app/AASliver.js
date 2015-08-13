var React = require('react');
var AASliver = React.createClass({
    render: function() {
        // return null
        var fatness = 24;
        var x1 = 50 - fatness;
        var x2 = 50 + fatness;
        var shift = this.props.shift;
        // var shift = 0;
        // if (this.props.positionInCodon === 1) {
        //     shift = x2;
        // }
        // if (this.props.forward) {
        //   if (this.props.positionInCodon === 2) {
        //     shift = x2 * 2; 
        //   }
        // } else {
        //   if (this.props.positionInCodon === 0) {
        //     shift = x2 * 2; 
        //   }
        // }
        return (
          <g
            onClick={this.props.onClick}
            transform={"translate(" + shift + ",0)"}
            >
            <polyline
              transform={this.props.forward ? null : "translate(100,0) scale(-1,1) "}
              points={"0,0 " + x2 + ",0 100,50 " + x2 + ",100 0,100 "+x1+",50 0,0"}
              strokeWidth="5"
              // stroke="black"
              opacity={.5}
              fill={this.props.color || 'orange'}>
            </polyline>
            {this.props.positionInCodon === 1 &&
            <text 
              transform="scale(3,3) translate(17,21)"
              x="0"  
              y="0"
              style={{textAnchor: "middle"}}
              >
              {this.props.letter}
            </text>
            }
          </g>
        );
    }
});
module.exports = AASliver;