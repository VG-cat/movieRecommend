
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

const words = [
  { text: '动作', size: 40 },
  { text: '喜剧', size: 35 },
  { text: '科幻', size: 30 },
  { text: '动画', size: 25 },
  { text: '恐怖', size: 20 },
  { text: '剧情', size: 35 },
  { text: '悬疑', size: 30 },
  { text: '爱情', size: 25 },
  { text: '纪录片', size: 20 },
  { text: '冒险', size: 30 },
  { text: '奇幻', size: 25 },
  { text: '犯罪', size: 20 },
  { text: '战争', size: 15 },
  { text: '历史', size: 15 },
];

const InterestsWordCloud = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const layout = cloud()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => (~~(Math.random() * 6) - 3) * 30)
      .fontSize(d => (d as any).size)
      .on("end", draw);

    layout.start();

    function draw(words: any[]) {
      d3.select(svgRef.current)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", d => `${d.size}px`)
        .style("fill", () => d3.schemeCategory10[~~(Math.random() * 10)])
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default InterestsWordCloud;
