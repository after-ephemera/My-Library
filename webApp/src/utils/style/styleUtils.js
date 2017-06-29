/**
 * Created by jk on 6/28/17.
 */


export const fadeInFromBelow = {
  '0%': {
    opacity: 0,
    top: '102vh',
  },
  '10%': {
    opacity: 0,
    top: '30vh',
  },
  '100%': {
    opacity: 1,
    top: '26vh',
  }
};

export const fadeOutToBelow = {
  '0%': {
    opacity: 1,
    top: '26vh',
  },
  '90%': {
    opacity: 0,
    top: '30vh',
  },
  '100%': {
    opacity: 0,
    top: '102vh',
  }
}