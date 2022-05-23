<!-- function calidx(category, info) {
  let cal = 0.0;
  switch (category) {
    case 'CONVENIENCE':
      if (info.a >= 1) {
        cal += 2;
        if (info.adist <= 500) cal += 0.5;
        if (info.a >= 3) cal += 0.5;
      }
      if (info.b >= 1) {
        cal += 2;
      }
      return cal;
    case 'EDUCATION':
      if (info.a >= 1) {
        cal += 3;
        if (info.adist <= 500) cal += 1;
        else if (info.adist <= 700) cal += 0.5;
      }
      if (info.b >= 1) {
        cal += 1;
      }
      return cal;
    case 'TRAFFIC':
      if (info.a >= 1) {
        cal += 3;
        if (info.adist <= 500) cal += 2;
        else if (info.adist <= 700) cal += 1;
        else if (info.adist <= 900) cal += 0.5;
      } else cal += 1.5;
      return cal;
    case 'MEDICAL':
      if (info.a >= 1) {
        cal += 2;
      } else if (info.a >= 2) {
        cal += 3;
      }
      if (info.b >= 1) {
        cal += 2;
      }
      return cal;
    case 'CAFE':
      if (info.a >= 1) {
        cal += 2;
        if (info.a >= 3) cal += 1;
        if (info.adist <= 500) cal += 2;
        else if (info.adist <= 700) cal += 1;
        else if (info.adist <= 900) cal += 0.5;
      }
      return cal;
    case 'CULTURE':
      if (info.a >= 1) cal += 2;
      cal += info.a;
      return cal >= 5 ? 5 : cal;
  }
} -->
