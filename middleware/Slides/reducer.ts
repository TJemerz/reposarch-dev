import { ActionMap } from "../ActionMap";

interface SlidesTypes {
  totalSlides: number;
  slides: any;
  currentSlideNumber: number;
  title: string | undefined;
}

export type SlidesState = SlidesTypes;

export type SlidesPayload = {
  ["SET_SLIDES"]: SlidesTypes;
  ["SET_SLIDE_TITLE"]: Pick<SlidesTypes, "title">;
  ["SET_SLIDE_NUMBER"]: Pick<SlidesTypes, "currentSlideNumber">;
};

export type SlidesActions =
  ActionMap<SlidesPayload>[keyof ActionMap<SlidesPayload>];
export const SlidesReducer = (state: SlidesState, action: SlidesActions) => {
  switch (action.type) {
    case "SET_SLIDES":
      const { slides, currentSlideNumber, totalSlides, title } = action.payload;
      return {
        ...state,
        slides,
        currentSlideNumber,
        totalSlides,
        title,
      };
    case "SET_SLIDE_TITLE":
      return {
        ...state,
        title: action.payload.title,
      };
    case "SET_SLIDE_NUMBER":
      return {
        ...state,
        currentSlideNumber: action.payload.currentSlideNumber,
      };
    default:
      return state;
  }
};
