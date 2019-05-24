import React, { Component } from 'react';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';

class StatisticsSection extends Component{
    constructor() {
        super();
        this.state = {
            graph1 : {},
            graph2 : {}
        }
    }

    getGraphOne = () =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/graph-one`)
            .then(res => res.json())

    getGraphTwo = () =>
        fetch(`https://av9tfntp3h.execute-api.us-west-1.amazonaws.com/prod/graph-two`)
            .then(res => res.json())

    componentDidMount() {
        this.getGraphOne()
            .then((params) => {
                this.setState({
                    graph1 : params,
                })
            })
        this.getGraphTwo()
            .then((params) => {
                this.setState({
                    graph2: params,
                })
            })
    }

    render(){
        const data1 = [
            { name: 'Group A', value: this.state.graph1['issued_books'] },
            { name: 'Group B', value: this.state.graph1['total_books'] }
        ];
        const data2 = [
            { name: 'Group A', value: this.state.graph2['issued_books'] },
            { name: 'Group B', value: this.state.graph2['overdue_books'] }
        ];
        const COLORS = ['#E2CD6D', '#E86F68'];
        return(
             <PieChart width={600} height={300} onMouseEnter={this.onPieEnter}>
                <Pie
                    data={data1}
                    cx={120}
                    cy={75}
                    innerRadius={45}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        data1.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Pie
                    data={data2}
                    cx={300}
                    cy={75}
                    innerRadius={45}
                    outerRadius={60}
                    fill="#E2CD6D"
                    paddingAngle={5}
                    dataKey="value"
                >
                    {
                        data2.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        )
    }
}

export default StatisticsSection

