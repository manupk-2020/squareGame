import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Renderer,
  Renderer2,
  AfterViewInit,
} from "@angular/core";

@Component({
  selector: "layout",
  templateUrl: "./layout.component.html",
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild("gameLayout", { static: true }) gameLayout: ElementRef;
  @ViewChild("layout", { static: true }) layout: ElementRef;
  scale: number = 2;
  matrix: Array<number> = [10, 10];
  constructor(public renderer: Renderer2) {}
  ngOnInit() {
    console.log(this.layout);
    this.bindElementToLayout();
  }

  ngAfterViewInit() {
    this.renderLayout();
  }

  renderLayout() {
    const element = this.layout.nativeElement;
    const bubbles = this.matrix.reduce((prev, current) => prev * current);
    const bubble_radius = 5;
    /*const slot = {
      width: (this.scale * 400) / this.matrix[0] - bubble_radius * 2,
      height: (this.scale * 400) / this.matrix[1] - bubble_radius * 2,
    };*/
    const slot = {
      width: (this.scale * 400 - 10) / (this.matrix[0] - 1),
      height: (this.scale * 400 - 10) / (this.matrix[1] - 1),
    };
    console.log(slot);
    this.renderer.setStyle(element, "width", this.scale * 400 + "px");
    this.renderer.setStyle(element, "height", this.scale * 400 + "px");

    let remaining_bubbles = bubbles;
    let index = { row: 0, column: 0 };

    for (var i = 0; i < this.matrix[1]; i++) {
      for (var j = 0; j < this.matrix[0]; j++) {
        this.renderer.appendChild(
          this.gameLayout.nativeElement,
          this.createElement("circle", [
            { name: "fill", value: "red" },
            { name: "r", value: bubble_radius.toString() },
            {
              name: "cx",
              value: (j * slot.width + 5).toString(),
            },
            {
              name: "cy",
              value: (i * slot.height + 5).toString(),
            },
          ])
        );
      }
    }
  }

  createElement(
    type: string,
    attributes: Array<{ name: string; value: string }>
  ) {
    const element = this.renderer.createElement(
      type,
      "http://www.w3.org/2000/svg"
    );
    attributes.forEach((attribute) =>
      this.renderer.setAttribute(element, attribute.name, attribute.value)
    );
    return element;
  }

  bindElementToLayout() {}
}
