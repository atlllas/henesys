import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { palsList } from './who.js';
import './LeftDiv.css';
import selectImage from '../assets/select.png'; // Import the image

let selectedCircle = null;

function selectCircle(circle) {
    // Deselect the previously selected circle (if any)
    if (selectedCircle) {
        selectedCircle.style("fill", "black");
    }

    // Select the new circle
    selectedCircle = circle;
    selectedCircle.style("fill", "white");
}

function LeftDiv({ onSelect }) {
    const [selected, setSelected] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            const svg = d3.select(ref.current);
            const width = svg.node().getBoundingClientRect().width;
            const height = svg.node().getBoundingClientRect().height;

            // Pack data
            const root = d3.pack()
            .size([width, height])
            .padding(10)
            .radius(d => 25)(d3.hierarchy({ children: palsList }).sum(d => 1));
        
            // Bind data
            const nodes = svg.selectAll("circle")
                .data(root.leaves());

            //Tool Tip
            const tooltip = d3.select("body").append("div")
                .style("position", "absolute")
                .style("background-color", "#cdcdcd")
                .style("padding", "5px")
                .style("z-index", 33)
                .style("border-radius", "5px")
                .style("opacity", 0) // start off as hidden
                .style("pointer-events", "none"); // make tooltip not capture mouse events
        
            // Enter selection
            nodes.enter()
                .append("circle")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y)
                .attr("r", d => d.r)
                .style("fill", "black")
                .style("stroke", "white")
                .on("click", function(event) {
                    
                    selectCircle(d3.select(this));
                    
                    const nodeData = d3.select(this).datum();
                    console.log(nodeData.data);  // This should now give you the original data object from palsList
                })
                .on("mouseover", function(event, d) {
                    const selectedData = d.data;

                    d3.select(this).style("fill", "#cdcdcd");

                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);

                    tooltip.html(selectedData.name + "<br/>last-online: " + new Date(selectedData.when).toLocaleDateString())
                        .style("left", (event.pageX + 5) + "px")
                        .style("top", (event.pageY - 28) + "px");
                })        
                .on("mouseout", function(d) {
                    if (selectedCircle !== this) {
                        d3.select(this).style("fill", "black");
                    }
                
                    tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
                });
        }
    }, [ref, onSelect]);

    return (
        <div className="left-container">
            <div className="top-section">
                <img src={selectImage} />
            </div>
            <div className="bottom-section">
                <svg ref={ref} width="100%" height="100%"></svg>
            </div>
        </div>
    );
}

export default LeftDiv;
