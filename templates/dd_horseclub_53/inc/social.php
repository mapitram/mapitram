<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
<ul class='social'>
  <?php if ($fc == 1) { ?><li>
    <a class="fa fa-facebook" href="<?php echo $this->params->get('facebook'); ?>">    
      <span>Facebook</span>
    </a> 
  </li><?php } ?>
  
  <?php if ($tc == 1) { ?><li>
    <a class="fa fa-twitter" href="<?php echo $this->params->get('twitter'); ?>">
      <span>Twitter</span>
    </a>
  </li><?php } ?>
  
 <?php if ($yc == 1) { ?> <li>
    <a class="fa fa-youtube" href="<?php echo $this->params->get('youtube'); ?>">
      <span>Youtube</span>
    </a>
  </li><?php } ?>
  
  <?php if ($gc == 1) { ?><li>
    <a class="fa fa-google-plus" href="<?php echo $this->params->get('google'); ?>">
    <span>Google Plus</span>
    </a> 
  </li><?php } ?>
  
</ul>