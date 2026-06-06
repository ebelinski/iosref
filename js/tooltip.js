document.addEventListener('DOMContentLoaded', function() {
  let activeTooltip = null;

  function createTooltip(target) {
    const text = target.getAttribute('data-tooltip');
    if (!text) return null;

    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    return tooltip;
  }

  function positionTooltip(target, tooltip) {
    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Position above target, centered horizontally
    let top = targetRect.top + window.scrollY - tooltipRect.height - 8;
    let left = targetRect.left + window.scrollX + (targetRect.width - tooltipRect.width) / 2;

    // Check bounds
    if (left < 10) left = 10;
    if (left + tooltipRect.width > window.innerWidth - 10) {
      left = window.innerWidth - tooltipRect.width - 10;
    }
    if (top < window.scrollY) {
      // If it goes off top of viewport, position it below the target instead
      top = targetRect.bottom + window.scrollY + 8;
    }

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
  }

  function showTooltip(target) {
    if (activeTooltip) {
      hideTooltip();
    }
    const tooltip = createTooltip(target);
    if (!tooltip) return;

    activeTooltip = tooltip;
    tooltip.style.display = 'block';
    positionTooltip(target, tooltip);
    
    // Force reflow
    tooltip.offsetHeight;
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    if (activeTooltip) {
      const tooltipToRemoval = activeTooltip;
      activeTooltip = null;
      tooltipToRemoval.classList.remove('visible');
      setTimeout(() => {
        if (tooltipToRemoval.parentNode) {
          tooltipToRemoval.parentNode.removeChild(tooltipToRemoval);
        }
      }, 150);
    }
  }

  // Event delegation for desktop hover
  document.addEventListener('mouseover', function(e) {
    const target = e.target.closest('.ios-version');
    if (target && window.matchMedia('(hover: hover)').matches) {
      showTooltip(target);
    }
  });

  document.addEventListener('mouseout', function(e) {
    const target = e.target.closest('.ios-version');
    if (target && window.matchMedia('(hover: hover)').matches) {
      hideTooltip();
    }
  });

  // Event delegation for mobile tap
  document.addEventListener('click', function(e) {
    const target = e.target.closest('.ios-version');
    if (target) {
      if (!window.matchMedia('(hover: hover)').matches || e.pointerType === 'touch') {
        e.preventDefault();
        e.stopPropagation();
        if (activeTooltip) {
          hideTooltip();
        } else {
          showTooltip(target);
        }
      }
    } else {
      hideTooltip();
    }
  });
});
